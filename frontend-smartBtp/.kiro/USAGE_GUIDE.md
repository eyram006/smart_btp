# SMART-BTP Material Creation - Usage Guide

## Quick Start

### Entry Point
Navigate to: `/chantiers/{chantierId}/materiaux/nouveau`

**Example:**
- User views a Chantier (e.g., ID: 5)
- Clicks "Add Material" button
- URL: `/chantiers/5/materiaux/nouveau`

### Form Sections

#### 1. Informations générales
- **Nom du matériau** (Required): Material name (e.g., "Ciment CPJ 45")
- **Catégorie** (Required): Choose from predefined list (Structure, Sols et murs, etc.)
- **Unité** (Required): Unit of measurement (sacs, kg, m³, tonnes, litres, pièces)
- **Description** (Optional): Technical details

#### 2. Gestion
- **Seuil critique** (Required): Alert threshold for low stock
  - Example: Set to 20 → Alert triggers when stock < 20
  - Useful for automated reordering workflows

#### 3. Stock initial
- **Quantité initiale** (Optional): Starting stock quantity
  - Dynamically shows selected unit
  - Example: Set unit to "sacs", quantity to 100 → "100 sacs"

### Submission Flow

**Step 1:** Fill form fields  
↓  
**Step 2:** Click "Enregistrer le matériau"  
↓  
**Step 3A (Success):**
- ✅ Material created in database
- ✅ Initial stock created for the chantier
- ✅ Success message displayed
- ✅ Auto-redirect to `/stocks/{chantierId}`

**Step 3B (Error - Client Validation):**
- ❌ Missing required field
- ❌ Invalid number (negative seuil_alerte)
- → Error message shown under field
- → Form data preserved
- → User can fix and resubmit

**Step 3C (Error - API Validation):**
- ❌ Material name already exists
- ❌ Invalid categorie value
- → Field-level or global error message shown
- → Form data preserved
- → User can fix and resubmit

**Step 3D (Error - Stock Creation Fails):**
- ⚠️ Material created successfully (STEP 1 ✅)
- ⚠️ Stock creation failed (STEP 2 ❌)
- → Error message displayed clearly
- → Form data preserved
- → User can retry or contact support
- → Material exists in catalog (recoverable state)

## Form Validation Rules

| Field | Required | Validation | Example |
|-------|----------|-----------|---------|
| nom | ✅ | Min 2 chars | "Ciment CPJ 45" |
| categorie | ✅ | Select from list | "structure" |
| unite | ✅ | Select from list | "sacs" |
| description | ❌ | Any text | "Portland composite..." |
| seuil_alerte | ✅ | Positive number ≥ 0 | 20 |
| quantite_initiale | ❌ | Positive number ≥ 0 | 100 |

## Data Sent to Backend

### Request 1: Create Material
```json
POST /api/materiaux
Content-Type: application/json
Authorization: Bearer {token}

{
  "nom": "Ciment CPJ 45",
  "description": "Portland composite...",
  "categorie": "structure",
  "unite": "sacs"
}
```

### Request 2: Create Initial Stock
```json
POST /api/stocks
Content-Type: application/json
Authorization: Bearer {token}

{
  "chantier_id": 5,
  "materiau_id": 42,
  "quantite": 100,
  "seuil_alerte": 20
}
```

## Expected Outcomes

### ✅ Success Case
```
1. Material created: { id: 42, nom: "Ciment CPJ 45", ... }
2. Stock created: { id: 8, chantier_id: 5, materiau_id: 42, quantite: 100, seuil_alerte: 20 }
3. User redirected to: /stocks/5
4. Material appears in stock list
```

### ❌ Validation Error (Client-Side)
```
Form: nom = "", categorie = ""
Action: Submit form
Result: Errors shown
  - "nom": "Le nom du matériau est obligatoire."
  - "categorie": "La catégorie est obligatoire."
Form data NOT lost
User can fix and resubmit
```

### ❌ Validation Error (API)
```
Request: nom = "Ciment CPJ 45" (already exists)
Response: 422 Unprocessable Entity
  { "errors": { "nom": ["Le nom existe déjà."] } }
Result: Field error shown
Form data preserved
User can retry or choose different name
```

### ⚠️ Partial Failure (STEP 2)
```
STEP 1: Material created successfully ✅
STEP 2: Stock creation fails (server error) ❌
Response: 500 Internal Server Error

Result:
  - Error message: "Une erreur est survenue..."
  - Material EXISTS in catalog (recoverable)
  - Stock NOT created
  - Form data preserved
  - User can:
    a) Retry submission (will fail on material creation with duplicate)
    b) Contact support with material ID 42
    c) Create stock manually via API or UI
```

## Chantier Context

The material is **always** tied to a specific Chantier via the URL param.

**Example Workflow:**
1. User views "Chantier Résidence Horizon" (ID: 5)
2. Clicks "New Material"
3. Redirected to `/chantiers/5/materiaux/nouveau`
4. Fills form (nom, categorie, quantite_initiale, etc.)
5. Submits
6. Stock initial created for **Chantier 5** automatically
7. Redirected to `/stocks/5` (stocks for Chantier 5)

## Navigation After Creation

### Success Path
```
Chantiers Page
  → View Chantier 5
    → Click "New Material"
      → /chantiers/5/materiaux/nouveau (form page)
        → Submit
          → Material & Stock created
            → Redirect to /stocks/5 (stock list for Chantier 5)
```

### If Back/Cancel Needed
- Bottom nav "Chantiers" → Back to chantiers list
- Bottom nav "Stocks" → View all stocks or chantier stocks
- No material partially created (if form not submitted)

## Common Use Cases

### Use Case 1: Add Ciment to Project
1. Open Chantier "Résidence Horizon"
2. New Material: nom="Ciment CPJ 45", categorie="structure", unite="sacs"
3. Set seuil_alerte=50, quantite_initiale=200
4. Submit → Material ready for stock tracking

### Use Case 2: Discover Existing Material Missing
1. Create material form
2. Get validation error: "Material already exists"
3. Go back to stocks, find existing material
4. Create mouvement (stock movement) instead

### Use Case 3: Minimal Material Entry
1. Only fill required fields: nom, categorie, unite
2. Leave description, quantite_initiale blank
3. Submit → Material created with 0 initial stock
4. Can manually adjust stock later

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| URL not found | Using wrong route | Check: `/chantiers/{chantierId}/materiaux/nouveau` |
| Form won't submit | Required field missing | Check red "required" markers and error messages |
| Validation says duplicate | Material already exists | Verify name in stock list or API |
| "Error occurred" after submit | STEP 2 failed (stock creation) | Contact support with material ID shown in response |
| Redirected to wrong chantier | chantierId wrong in URL | Verify chantier selection before creating material |
| Bottom nav missing | Layout issue | Ensure page inside `<DashboardLayout />` |

## Advanced: Manual Stock Adjustment

After creating material with initial stock:

1. Go to `/stocks/{chantierId}`
2. Find the material you just created
3. Click "Add Movement" to record stock changes
4. Create "Mouvement" entries for usage/delivery

Example:
- Initial stock: 200 sacs
- Day 1: Use 50 sacs → Mouvement -50
- Day 2: Receive 100 sacs → Mouvement +100
- Current: 250 sacs

---

**Last Updated:** June 2026 | **Version:** 1.0.0
