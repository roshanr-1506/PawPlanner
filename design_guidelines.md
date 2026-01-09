Pet Planner Design Guidelines
Design Approach
Utility-First with Delightful Interactions: A productivity tool that combines the clean information architecture of Notion with the warm, engaging interface of Headspace. We'll use Material Design principles for component structure while implementing the user's specified soft, nurturing aesthetic.

Core Design Principles
Clarity First: Pet care tasks must be immediately scannable
Emotional Connection: Warmth through color, avatars, and micro-interactions
Progress Visibility: Always show completion status at a glance
Gentle Encouragement: Positive reinforcement without overwhelming
Typography
Primary Font: Inter (Google Fonts) for clean readability
Accent Font: Quicksand (Google Fonts) for warm, friendly headings
Hierarchy:
Page Headers: text-3xl font-quicksand font-semibold
Section Titles: text-xl font-quicksand font-medium
Card Titles: text-lg font-inter font-medium
Body Text: text-base font-inter
Metadata/Time: text-sm font-inter text-opacity-70
Layout System
Spacing Primitives: Use Tailwind units of 2, 4, 6, and 8 consistently

Component padding: p-4 to p-6
Section gaps: gap-6
Page margins: px-4 md:px-8
Vertical rhythm: space-y-6 for sections, space-y-4 for cards
Container Strategy:

Max-width: max-w-7xl mx-auto
Dashboard grid: grid-cols-1 lg:grid-cols-3 for Today's Schedule (2 cols) + Quick Actions (1 col)
Card grids: grid-cols-1 md:grid-cols-2 for activity cards
Color Palette (User-Specified)
Peach: Primary actions, completed tasks (#FFD4C4)
Mint: Active/in-progress items (#C4E8D9)
Sand: Background, neutral states (#F5F0E8)
Light Blue: Alerts, upcoming appointments (#D4E8FF)
Text: Charcoal gray for primary text (#2D3748)
Success: Bright green for completion celebrations (#48BB78)
Component Library
Dashboard Layout
Three-Column Desktop Grid:

Today's Schedule (col-span-2): Timeline view with time markers, upcoming tasks as cards
Pet Avatar & Status (col-span-1): Large animated avatar, quick stats (tasks done/total)
Activity Progress (full-width): Horizontal progress bars with icons (feeding, walks, meds)
Mood/Health Log (full-width): Recent entries as chips with emoji indicators
Task Cards
Rounded corners: rounded-xl
Shadow: shadow-md with subtle hover lift (hover:shadow-lg transition)
Structure: Icon (left) + Task Details (center) + Checkbox or Time (right)
States: Default (white bg), Completed (peach tint), Overdue (light blue with alert icon)
Pet Avatar Component
Circular container: w-32 h-32 rounded-full
SVG or image-based pet illustration
States (facial expression changes):
Happy: All tasks completed (smiling, bright eyes)
Neutral: Tasks in progress (calm expression)
Sad: Overdue tasks (droopy ears/eyes)
Sleeping: Night mode (closed eyes, zzz animation)
Navigation
Top header: Logo left, Add Pet/Settings right
Pet switcher: Horizontal scrollable pet avatars (if multiple pets)
Active pet highlighted with mint border
Forms (Add Task/Appointment)
Input fields: border-2 with rounded-lg, focus:border-peach transition
Date/time pickers: Calendar overlay with soft shadows
Dropdowns: Custom styled with icons (pet mood selector with emoji)
Activity Tracker
Quick log buttons: Large touch targets (h-16) with icons
Timer interface for walks: Big digits, start/stop with circular progress
History cards: Compact timeline view with timestamps
Appointment Calendar
Month view with dots indicating scheduled days
Upcoming list view with countdown (e.g., "In 3 days")
Alert badge on appointments within 24 hours
Animations & Micro-Interactions
Paw Print Loading: Animated paw prints bouncing (3 dots, stagger animation)
Task Completion: Checkmark animation + subtle confetti effect (2-3 particles)
Avatar State Transitions: Smooth morph between expressions (300ms ease)
Card Swipe: Slide animation when marking tasks complete
Progress Bars: Animated fill on page load (500ms delay per bar)
Motivational Toast: Slide-up message with paw icon after task completion
Responsive Behavior
Mobile: Single column, bottom navigation for quick actions
Tablet: 2-column grid for cards, collapsible sidebar
Desktop: Full 3-column dashboard layout
Images
Hero Section: Not applicable - this is a dashboard-first application Pet Avatars: Custom illustrated pet icons or user-uploaded photos in circular frames Empty States: Friendly illustrations when no tasks scheduled (sleeping pet, "All caught up!" message)

Accessibility
All interactive elements: min-h-12 for touch targets
Color contrast: 4.5:1 minimum for text
Focus indicators: 2px solid ring in mint color
Screen reader labels on all icons and avatar states
This design creates a warm, encouraging environment that makes pet care feel less like a chore and more like caring for a beloved companion.
