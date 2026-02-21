<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js App Router application. The following changes were made:

- **`instrumentation-client.ts`** (new file): Initializes PostHog client-side using the modern Next.js 15.3+ instrumentation approach. Configured with a reverse proxy (`/ingest`), automatic exception/error tracking (`capture_exceptions: true`), and debug mode in development.
- **`next.config.ts`** (updated): Added PostHog reverse proxy rewrites so analytics traffic routes through your own domain, avoiding ad blockers. Also set `skipTrailingSlashRedirect: true` for PostHog API compatibility.
- **`components/ExploreBtn.tsx`** (updated): Added `posthog.capture('explore_events_clicked')` when the user clicks the Explore Events CTA button — this is the top of the engagement funnel.
- **`components/EventCard.tsx`** (updated): Converted to a client component and added `posthog.capture('event_card_clicked', {...})` with rich properties (event title, slug, location, date, time) when users click any event card.
- **`components/Navbar.tsx`** (updated): Converted to a client component and added `posthog.capture('navbar_link_clicked', {...})` on all nav links (with `link_label` and `link_href` properties), plus `posthog.capture('navbar_create_event_clicked')` on the Create Event link to track creator intent.
- **`.env.local`** (updated): Stores `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables securely (covered by `.gitignore`).

## Events instrumented

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the 'Explore Events' CTA button to scroll to the events listing section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked an event card to view event details. Captures `event_title`, `event_slug`, `event_location`, `event_date`, `event_time` properties | `components/EventCard.tsx` |
| `navbar_link_clicked` | User clicked a navigation link in the navbar. Captures `link_label` and `link_href` properties to understand navigation patterns | `components/Navbar.tsx` |
| `navbar_create_event_clicked` | User clicked the 'Create Event' navbar link — signals intent to list a new event (top of creator funnel) | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- 📊 **Dashboard – Analytics basics**: https://us.posthog.com/project/319527/dashboard/1297004
- 📈 **Explore Events Button Clicks** (trend): https://us.posthog.com/project/319527/insights/AgiCe4s9
- 📈 **Event Card Clicks** (trend): https://us.posthog.com/project/319527/insights/agSIx4No
- 🔀 **Event Discovery Funnel: Explore → Event Click** (funnel): https://us.posthog.com/project/319527/insights/ZUrK5iWy
- 📊 **Most Popular Events Clicked** (breakdown by event title): https://us.posthog.com/project/319527/insights/0mOGhecM
- 👤 **Unique Users Engaging with Events** (daily active users): https://us.posthog.com/project/319527/insights/PirMD8Jh
- 📈 **Create Event Button Clicks** (trend): https://us.posthog.com/project/319527/insights/YKf39OCn
- 📊 **Navbar Link Clicks by Section** (breakdown by link label): https://us.posthog.com/project/319527/insights/ZYStJPLT

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
