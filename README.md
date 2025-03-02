# Peerlist Profile UI

This is a simple project to create a Peerlist UI and use Peerlist as a kind of CMS to store the data. Users can design the UI as they want; for me, this was just a fun project.

## Integrations

The following integrations are supported:

- [ ] ADPList
- [ ] CodeForces
- [x] DEV
- [ ] Dribbble
- [ ] Github
- [ ] Gumroad
- [x] Hashnode
- [x] Medium
- [x] ProductHunt
- [ ] RSS feed
- [x] Substack
- [ ] YouTube

## TODO

- [ ] Add support for logos in skills.
- [x] Cron to update the website every 24 hours.
- [ ] OpenGraph image.
- [ ] Get location from peerlist.

## Daily Updates with Cron Job

To keep the information updated regularly, you can set up a webhook and a cron job to trigger site updates automatically.

### Creating a Deploy Webhook

Create the deploy webhook from the Settings or Site Configuration section from the dashboard of the your deployment platform.

You can also use this deploy hook URL directly to redeploy the site manually - for example, if you update something on your Peerlist profile.

### Setting up a Cron Job

You can use any cron provider you like, for example https://cron-job.org.

1. Create a new cron job.
2. Add a title for your job.
3. Paste the webhook URL into the URL field.
4. Select the frequency to **every day** at your preferred time.
5. (Optional) You can check other options if needed.

This will ensure your website stays updated without manual intervention.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
