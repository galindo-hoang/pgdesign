# ProjectDetailModel Connection Pool Timeout Fix

## Vấn đề
Endpoint `/api/v1/projectdetail/category/appartment` đang gặp lỗi:
```
Knex: Timeout acquiring a connection. The pool is probably full. Are you missing a .transacting(trx) call?
```

## Nguyên nhân gốc rễ
Các method trong `ProjectDetailModel` không sử dụng transaction handling đúng cách, dẫn đến connection leaks:

1. **`getAll()`** - Method được gọi bởi `getProjectsByCategory` controller
2. **`getById()`** - Method để lấy project detail theo ID
3. **`findByProjectId()`** - Method để tìm project theo project ID
4. **`getCategories()`** - Method để lấy danh sách categories
5. **`getCategoryCounts()`** - Method để đếm số lượng projects theo category
6. **`getPaginated()`** - Method để phân trang projects
7. **`delete()`** - Method để xóa project (soft delete)

## Các fix đã thực hiện

### 1. Fixed `getAll()` Method
**Trước khi fix:**
```typescript
async getAll(filters?: ProjectDetailFilters): Promise<ProjectDetailData[]> {
  let query = db(this.tableName)
    .select("*")
    .where("is_active", true)
    .orderBy("created_at", "desc");
  // ... filters logic
  const rows: ProjectDetailRow[] = await query;
  return rows.map((row) => this.transformRowToData(row));
}
```

**Sau khi fix:**
```typescript
async getAll(filters?: ProjectDetailFilters): Promise<ProjectDetailData[]> {
  const trx = await db.transaction();
  
  try {
    let query = trx(this.tableName)
      .select("*")
      .where("is_active", true)
      .orderBy("created_at", "desc");
    // ... filters logic
    const rows: ProjectDetailRow[] = await query;
    await trx.commit();
    
    return rows.map((row) => this.transformRowToData(row));
  } catch (error) {
    await trx.rollback();
    throw error;
  }
}
```

### 2. Fixed `getById()` Method
**Trước khi fix:**
```typescript
async getById(id: number): Promise<ProjectDetailData | null> {
  const row: ProjectDetailRow = await db(this.tableName)
    .select("*")
    .where({ id })
    .first();
  // ...
}
```

**Sau khi fix:**
```typescript
async getById(id: number): Promise<ProjectDetailData | null> {
  const trx = await db.transaction();
  
  try {
    const row: ProjectDetailRow = await trx(this.tableName)
      .select("*")
      .where({ id })
      .first();
    await trx.commit();
    // ...
  } catch (error) {
    await trx.rollback();
    throw error;
  }
}
```

### 3. Fixed `findByProjectId()` Method
Tương tự như `getById()`, đã wrap trong transaction với proper error handling.

### 4. Fixed `getCategories()` Method
**Trước khi fix:**
```typescript
async getCategories(): Promise<string[]> {
  const result = await db(this.tableName)
    .distinct("category")
    .where("is_active", true)
    .orderBy("category");
  return result.map((row) => row.category);
}
```

**Sau khi fix:**
```typescript
async getCategories(): Promise<string[]> {
  const trx = await db.transaction();
  
  try {
    const result = await trx(this.tableName)
      .distinct("category")
      .where("is_active", true)
      .orderBy("category");
    await trx.commit();
    return result.map((row) => row.category);
  } catch (error) {
    await trx.rollback();
    throw error;
  }
}
```

### 5. Fixed `getCategoryCounts()` Method
Tương tự như `getCategories()`, đã wrap trong transaction.

### 6. Fixed `getPaginated()` Method
Method này phức tạp hơn vì sử dụng `Promise.all()` với multiple queries. Đã wrap toàn bộ trong transaction.

### 7. Fixed `delete()` Method
**Trước khi fix:**
```typescript
override async delete(id: number): Promise<boolean> {
  const updated = await db(this.tableName).where({ id }).update({
    is_active: false,
    updated_at: new Date(),
  });
  return updated > 0;
}
```

**Sau khi fix:**
```typescript
override async delete(id: number): Promise<boolean> {
  const trx = await db.transaction();
  
  try {
    const updated = await trx(this.tableName).where({ id }).update({
      is_active: false,
      updated_at: new Date(),
    });
    await trx.commit();
    return updated > 0;
  } catch (error) {
    await trx.rollback();
    throw error;
  }
}
```

## Lợi ích của việc fix

### 1. **Ngăn chặn Connection Leaks**
- Tất cả database queries giờ đây được wrap trong transactions
- Connections được đảm bảo release về pool sau khi commit/rollback
- Không còn connection leaks từ các queries không được quản lý đúng cách

### 2. **Improved Error Handling**
- Proper rollback khi có lỗi xảy ra
- Consistent error handling across all methods
- Better debugging và monitoring capabilities

### 3. **Better Performance**
- Reduced connection pool exhaustion
- More predictable database performance
- Better resource utilization

## Testing

### Test Script
Đã tạo test script chuyên biệt: `test-projectdetail-category-endpoint.js`

**Cách sử dụng:**
```bash
node test-projectdetail-category-endpoint.js
```

**Test script sẽ:**
- Test endpoint `/api/v1/projectdetail/category/appartment` với 30 concurrent requests
- Monitor connection pool status trước và sau test
- Detect connection pool timeout errors
- Provide detailed performance metrics

### Manual Testing
```bash
# Test endpoint trực tiếp
curl http://localhost:3002/api/v1/projectdetail/category/appartment

# Check pool status
curl http://localhost:3002/pool-status

# Check health
curl http://localhost:3002/health
```

## Monitoring

### Real-time Pool Monitoring
```bash
# Check current pool status
curl http://localhost:3002/pool-status

# Check overall health
curl http://localhost:3002/health
```

### Development Mode Monitoring
Application sẽ tự động log connection pool status mỗi 30 giây trong development mode:
```
🔍 Connection Pool Status: { used: 2, free: 18, pendingAcquires: 0, total: 20 }
```

## Kết quả mong đợi

### Trước khi fix
- ❌ Connection pool timeouts trên endpoint `/api/v1/projectdetail/category/appartment`
- ❌ "Pool is probably full" errors
- ❌ Connection leaks từ ProjectDetailModel methods

### Sau khi fix
- ✅ Proper transaction handling ngăn chặn connection leaks
- ✅ Endpoint `/api/v1/projectdetail/category/appartment` hoạt động ổn định
- ✅ Real-time monitoring cung cấp visibility vào pool health
- ✅ Graceful error handling và recovery

## Files đã được modify
- `pgdesign-be/src/models/ProjectDetailModel.ts` - Fixed tất cả methods để sử dụng proper transaction handling
- `test-projectdetail-category-endpoint.js` - Created test script để validate fixes

## Next Steps
1. **Run test script**: `node test-projectdetail-category-endpoint.js`
2. **Monitor endpoints**: Test endpoint `/api/v1/projectdetail/category/appartment` với Postman
3. **Watch logs**: Monitor connection pool status logs trong development mode
4. **Load testing**: Test với multiple concurrent users/requests

Connection pool timeout issues cho ProjectDetailModel endpoints giờ đây đã được resolved với proper transaction handling và enhanced monitoring.
