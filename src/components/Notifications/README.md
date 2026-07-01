# Notifications System

This is a complete notification preview and design system for Email and Slack notifications across different tiers, user types, and channels.

## URL Structure

Navigate using hash-based URLs:

```
/#/notifications/[tier]/[userType]/[channel]
```

### Parameters

- **tier**: `approaching`, `reaching`, or `exceeding`
- **userType**: `admin`, `accountOwner`, `customerSuccess`, `accountManager`, or `csm`
- **channel**: `email`, `slack`, or `both`

## Examples

- `/#/notifications/approaching/admin/email` - Approaching tier, Admin user, Email channel
- `/#/notifications/reaching/accountOwner/both` - Reaching tier, Account Owner, Both channels
- `/#/notifications/exceeding/customerSuccess/slack` - Exceeding tier, CS, Slack channel

## User Matrix

### Availability by Tier

| User Type | Approaching | Reaching | Exceeding |
|-----------|-------------|----------|-----------|
| Admin | Email | Email | Email |
| Account Owner | Email + Slack | Email + Slack | Email + Slack |
| Customer Success | Email + Slack | Email + Slack | Email + Slack |
| Account Manager | — | Email | Email |
| CSM | — | Email | Email |

## Content Management

All notification content is managed in `/src/data/notifications/`:

- `approaching.js` - Approaching tier content
- `reaching.js` - Reaching tier content
- `exceeding.js` - Exceeding tier content
- `contentResolver.js` - Content fetching and availability matrix

### Content Structure

Each content file exports a tiered object with content for each user type and channel:

```javascript
export const approachingContent = {
  admin: {
    email: { subject, greeting, body, yourMove, cta1, cta2 },
    slack: { title, greeting, body, yourMove, cta1, cta2 }
  },
  accountOwner: { ... },
  // etc.
}
```

## Components

### NotificationsPage
Main orchestrator component that handles routing and state management.

### EmailTemplate
Renders email notification previews with Nintex branding, proper formatting, and CTAs.

### SlackTemplate
Renders Slack notification previews with Slack UI mockup, message formatting, and link CTAs.

### Shared Components
- `TierSelector` - Navigate between approaching/reaching/exceeding tiers
- `UserTypeSelector` - Select user type (auto-filtered by tier availability)
- `ChannelToggle` - Choose email/slack/both (auto-filtered by user type)

## Modifying Content

To update notification content for any tier/user/channel combination:

1. Open the corresponding file in `/src/data/notifications/`
2. Navigate to the tier → user type → channel
3. Update the content object:
   - Email: `subject`, `greeting`, `body`, `yourMove`, `cta1`, `cta2`
   - Slack: `title`, `greeting`, `body`, `yourMove`, `cta1`, `cta2`

Changes apply instantly - no template rebuilding needed.

## Dual-Channel Preview

When a user has access to both email and slack (e.g., Account Owner), the system can show both previews side-by-side:

Navigate to: `/#/notifications/reaching/accountOwner/both`

This displays email and slack previews in a responsive grid layout.

## Future Enhancements

- [ ] Export as HTML/JSON for actual sending
- [ ] Template variables (customer name, usage %, dates)
- [ ] A/B testing variants
- [ ] Send history and analytics
- [ ] Delivery scheduling
