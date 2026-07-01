# Notifications System - Complete Setup

## ✅ All Phases Completed

### Phase 1: Routing & State Management ✓
- Hash-based routing system (`/#/notifications/tier/userType/channel`)
- Route parser utility with validation
- State management for tier, user type, and channel selection
- Dynamic URL building

### Phase 2: Email Template Development ✓
- Professional email template with Nintex branding
- Responsive HTML table-based layout
- Dark blue header with Nintex logo
- Content sections: greeting, body, CTA, footer
- Styled buttons (primary blue, secondary outline)
- Ready for actual email sending

### Phase 3: Slack Template Development ✓
- Slack UI mockup with sidebar and message interface
- Message formatting with highlighted keywords
- Support for multiple highlight colors (red/orange)
- Link-based CTAs
- Reply box interface mockup
- Realistic Slack visual styling

### Phase 4: UI Polish & Dual-Channel Features ✓
- Side-by-side email + Slack preview for users with both channels
- Responsive grid layout (auto-stacks on mobile)
- Shared navigation components with auto-filtering
- Sidebar for tier/user/channel selection
- Preview titles for clarity
- Breadcrumb navigation showing current selection

## File Structure

```
src/
├── components/
│   └── Notifications/
│       ├── index.js (exports)
│       ├── NotificationsPage.jsx (main orchestrator)
│       ├── README.md (documentation)
│       ├── Email/
│       │   └── EmailTemplate.jsx
│       ├── Slack/
│       │   └── SlackTemplate.jsx
│       └── Shared/
│           ├── TierSelector.jsx
│           ├── UserTypeSelector.jsx
│           └── ChannelToggle.jsx
├── data/
│   └── notifications/
│       ├── approaching.js (content)
│       ├── reaching.js (content)
│       ├── exceeding.js (content)
│       └── contentResolver.js (utilities)
├── utils/
│   └── notificationRouteParser.js (routing)
└── styles/
    ├── NotificationsPage.css
    ├── EmailTemplate.css
    ├── SlackTemplate.css
    ├── NotificationTierSelector.css
    ├── NotificationUserTypeSelector.css
    └── NotificationChannelToggle.css
```

## How to Access

Navigate to: `/#/notifications/[tier]/[userType]/[channel]`

### Example URLs

**Admin Users:**
- `/#/notifications/approaching/admin/email`
- `/#/notifications/reaching/admin/email`
- `/#/notifications/exceeding/admin/email`

**Account Owner (Full Access):**
- `/#/notifications/approaching/accountOwner/email`
- `/#/notifications/approaching/accountOwner/slack`
- `/#/notifications/approaching/accountOwner/both` (dual preview)
- `/#/notifications/reaching/accountOwner/both`
- `/#/notifications/exceeding/accountOwner/both`

**Customer Success:**
- `/#/notifications/approaching/customerSuccess/both`
- `/#/notifications/reaching/customerSuccess/both`
- `/#/notifications/exceeding/customerSuccess/both`

**Account Manager / CSM:**
- `/#/notifications/reaching/accountManager/email`
- `/#/notifications/exceeding/csm/email`

## Navigation Features

1. **Tier Selector** - Switch between approaching/reaching/exceeding
2. **User Type Selector** - Choose user type (auto-filtered by tier)
3. **Channel Toggle** - Select email/slack/both (auto-filtered by user type)

All three components are interdependent and auto-update when selections change.

## Content Management

Modify notification content by editing files in `src/data/notifications/`:

1. Choose tier file: `approaching.js`, `reaching.js`, or `exceeding.js`
2. Find user type: `admin`, `accountOwner`, `customerSuccess`, `accountManager`, `csm`
3. Find channel: `email` or `slack`
4. Update fields:
   - **Email**: `subject`, `greeting`, `body`, `yourMove`, `cta1`, `cta2`
   - **Slack**: `title`, `greeting`, `body`, `yourMove`, `cta1`, `cta2`

Changes apply instantly in the preview.

## Design Specifications

### Email Template
- Header: Dark navy (#0F1C3F) with Nintex branding
- Font: System stack (-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)
- Primary CTA: Blue (#2563EB)
- Secondary CTA: Outlined
- Font sizes: Title (28px), Body (16px), Label (14px)

### Slack Template
- Workspace: Purple sidebar (#541554)
- Message area: Clean white background
- Bot avatar: Gradient purple
- Highlights: Red/Orange with backgrounds
- Responsive: Full Slack UI mockup

## Availability Matrix

```
Tier        Admin   AO      CS      AM      CSM
Approaching Email   Both    Both    —       —
Reaching    Email   Both    Both    Email   Email
Exceeding   Email   Both    Both    Email   Email
```

AO = Account Owner, CS = Customer Success, AM = Account Manager, CSM = Customer Success Manager

## Testing the System

1. Start the dev server (already running)
2. Navigate to `/#/notifications/approaching/admin/email`
3. Use the selectors to switch between different combinations
4. Verify auto-filtering works (user types update based on tier, channels update based on user)
5. Test dual-channel preview with `/#/notifications/reaching/accountOwner/both`
6. Verify responsive design on mobile viewport

## Next Steps (Future Phases)

- [ ] Actual email sending integration
- [ ] Slack webhook integration for sending
- [ ] Template variable system (dynamic customer names, %ages)
- [ ] Send history and tracking
- [ ] A/B testing variants
- [ ] Delivery scheduling
- [ ] Analytics dashboard
- [ ] Unsubscribe/preference management
- [ ] HTML export functionality
