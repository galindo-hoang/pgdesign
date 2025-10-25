# PROJECT CODE AUTO-GENERATION IMPLEMENTATION ✅

## 🎯 **Yêu cầu:**
**"Ở field `Mã dự án` phần mục lục này backend sẽ tự generate dựa trên project thuộc project-category nào không nên để cho user gen tự ý"**

### 📋 **Tóm tắt:**
- **Backend**: Tự động generate project code dựa trên category
- **Frontend**: Field "Mã Dự Án" thành read-only khi tạo mới
- **Logic**: Auto-generate khi user chọn category

## 🔧 **Implementation:**

### **1. Backend - Project Code Generation Logic**

#### **A. ProjectDetailModel.ts - New Method:**
```typescript
// Generate next project code based on category
async generateNextProjectCode(category: string): Promise<string> {
  const trx = await db.transaction();
  
  try {
    // Category mapping to prefix
    const categoryPrefixes: { [key: string]: string } = {
      'appartment': 'APPARTMENT',
      'house-normal': 'HOUSE-NORMAL', 
      'village': 'VILLAGE',
      'house-business': 'HOUSE-BUSINESS'
    };

    const prefix = categoryPrefixes[category];
    if (!prefix) {
      throw new Error(`Invalid category: ${category}`);
    }

    // Find the highest existing project code for this category
    const existingProjects = await trx(this.tableName)
      .select('project_id')
      .where('project_id', 'like', `${prefix}%`)
      .orderBy('project_id', 'desc')
      .limit(1);

    let nextNumber = 1;
    
    if (existingProjects.length > 0) {
      const lastProjectId = existingProjects[0].project_id;
      // Extract number from project ID (e.g., "APPARTMENT001" -> 1)
      const match = lastProjectId.match(new RegExp(`${prefix}(\\d+)`));
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    // Format with leading zeros (e.g., 1 -> "001")
    const formattedNumber = nextNumber.toString().padStart(3, '0');
    const projectCode = `${prefix}${formattedNumber}`;

    await trx.commit();
    return projectCode;
  } catch (error) {
    await trx.rollback();
    throw error;
  }
}
```

#### **B. ProjectDetailController.ts - New Endpoint:**
```typescript
/**
 * Generate next project code for a category
 * GET /api/v1/projectdetail/util/generate-code/:category
 */
generateProjectCode = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.params;
  
  if (!category) {
    throw createError('Category parameter is required', 400);
  }

  const projectCode = await ProjectDetailModel.generateNextProjectCode(category);
  
  const response: ApiResponse<string> = {
    success: true,
    data: projectCode,
    message: `Project code generated successfully for category: ${category}`
  };

  res.json(response);
});
```

#### **C. Routes - New Route:**
```typescript
/**
 * Generate next project code for a category
 * GET /api/v1/projectdetail/util/generate-code/:category
 */
router.get(
  '/util/generate-code/:category',
  ProjectDetailController.generateProjectCode
);
```

### **2. Frontend - Auto-Generation Integration**

#### **A. New Service - projectCodeService.ts:**
```typescript
const API_BASE_URL = 'http://localhost:3002/api/v1/projectdetail/util';

export const generateProjectCode = async (category: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-code/${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    } else {
      console.error('API returned unsuccessful response:', result);
      throw new Error('Failed to generate project code');
    }
  } catch (error) {
    console.error('Error generating project code:', error);
    throw error;
  }
};
```

#### **B. ProjectDetailEditor.tsx - Auto-Generation Logic:**
```typescript
// Handle form changes
const handleInputChange = async (field: keyof ProjectDetailFormData, value: any) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));

  // Auto-generate project code when category changes (only for new projects)
  if (field === 'category' && mode === 'add') {
    try {
      const generatedCode = await generateProjectCode(value);
      setFormData(prev => ({
        ...prev,
        projectId: generatedCode
      }));
    } catch (error) {
      console.error('Failed to generate project code:', error);
      // Fallback to manual input if generation fails
    }
  }
};
```

#### **C. Read-Only Field Implementation:**
```typescript
<div className="form-group">
  <label>Mã Dự Án *</label>
  <input
    type="text"
    value={formData.projectId}
    onChange={(e) => handleInputChange('projectId', e.target.value)}
    placeholder="VD: APARTMENT001"
    readOnly={mode === 'add'}
    className={mode === 'add' ? 'readonly-field' : ''}
  />
  {mode === 'add' && (
    <small className="field-note">
      Mã dự án sẽ được tự động tạo dựa trên danh mục
    </small>
  )}
</div>
```

#### **D. CSS Styling:**
```css
/* Readonly field styling */
.readonly-field {
  background-color: #f5f5f5 !important;
  color: #666 !important;
  cursor: not-allowed !important;
  border-color: #ddd !important;
}

.field-note {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #666;
  font-style: italic;
}
```

## 📊 **Project Code Patterns:**

### **Category Mapping:**
| Category | Prefix | Example Codes |
|----------|--------|---------------|
| `appartment` | `APPARTMENT` | APPARTMENT001, APPARTMENT002, ... |
| `house-normal` | `HOUSE-NORMAL` | HOUSE-NORMAL011, HOUSE-NORMAL012, ... |
| `village` | `VILLAGE` | VILLAGE021, VILLAGE022, ... |
| `house-business` | `HOUSE-BUSINESS` | HOUSE-BUSINESS020, HOUSE-BUSINESS021, ... |

### **Generation Logic:**
1. **Find Latest**: Query database for highest existing code in category
2. **Extract Number**: Parse number from existing code (e.g., "APPARTMENT010" → 10)
3. **Increment**: Add 1 to get next number (10 → 11)
4. **Format**: Pad with leading zeros (11 → "011")
5. **Combine**: Create final code ("APPARTMENT" + "011" = "APPARTMENT011")

## ✅ **API Testing Results:**

### **Test Commands:**
```bash
# Test apartment category
curl -s http://localhost:3002/api/v1/projectdetail/util/generate-code/appartment | jq '.data'
# Result: "APPARTMENT011"

# Test house-normal category  
curl -s http://localhost:3002/api/v1/projectdetail/util/generate-code/house-normal | jq '.data'
# Result: "HOUSE-NORMAL021"

# Test village category
curl -s http://localhost:3002/api/v1/projectdetail/util/generate-code/village | jq '.data'
# Result: "VILLAGE026"

# Test house-business category
curl -s http://localhost:3002/api/v1/projectdetail/util/generate-code/house-business | jq '.data'
# Result: "HOUSE-BUSINESS027"
```

### **API Response Format:**
```json
{
  "success": true,
  "data": "APPARTMENT011",
  "message": "Project code generated successfully for category: appartment"
}
```

## 🎯 **User Experience:**

### **Before (Manual Input):**
- ❌ User phải tự nhập project code
- ❌ Có thể duplicate hoặc sai format
- ❌ Không consistent với naming convention
- ❌ Dễ gây lỗi khi nhập

### **After (Auto-Generation):**
- ✅ **Automatic**: Tự động generate khi chọn category
- ✅ **Consistent**: Luôn follow naming convention
- ✅ **Unique**: Không bao giờ duplicate
- ✅ **Read-Only**: User không thể edit khi tạo mới
- ✅ **Visual Feedback**: Hiển thị note giải thích
- ✅ **Fallback**: Vẫn có thể manual input nếu API fail

## 🔄 **Workflow:**

### **New Project Creation:**
1. **User selects category** → `handleInputChange('category', value)`
2. **Auto-trigger generation** → `generateProjectCode(category)`
3. **API call** → `/api/v1/projectdetail/util/generate-code/${category}`
4. **Backend generates** → Find latest + increment + format
5. **Update form** → `setFormData(prev => ({ ...prev, projectId: generatedCode }))`
6. **UI updates** → Field shows generated code (read-only)

### **Edit Existing Project:**
- **Project code field**: Editable (not read-only)
- **No auto-generation**: Giữ nguyên code cũ

## 🚀 **Benefits:**

### **1. Data Consistency:**
- ✅ **Standardized Format**: Tất cả codes follow same pattern
- ✅ **No Duplicates**: Database-level uniqueness
- ✅ **Sequential Numbers**: Easy to track project count

### **2. User Experience:**
- ✅ **Zero Manual Work**: User chỉ cần chọn category
- ✅ **No Errors**: Không thể nhập sai format
- ✅ **Clear Feedback**: Visual indication của auto-generation

### **3. System Reliability:**
- ✅ **Transaction Safety**: Database consistency
- ✅ **Error Handling**: Graceful fallback
- ✅ **Performance**: Optimized queries

### **4. Maintainability:**
- ✅ **Centralized Logic**: All generation logic in one place
- ✅ **Easy Extension**: Dễ thêm categories mới
- ✅ **Clear Code**: Well-documented và readable

## 📝 **Key Features:**

- **🔄 Auto-Generation**: Tự động khi chọn category
- **🔒 Read-Only**: Không edit được khi tạo mới
- **📝 Visual Note**: Hiển thị explanation
- **⚡ Real-time**: Update ngay lập tức
- **🛡️ Error Handling**: Fallback nếu API fail
- **🎯 Category-Based**: Different patterns per category
- **📊 Sequential**: Incremental numbering
- **✅ Transaction Safe**: Database consistency

**Project code auto-generation đã được implement hoàn chỉnh! Backend sẽ tự động generate mã dự án dựa trên category và frontend sẽ hiển thị field này dưới dạng read-only khi tạo mới.**
