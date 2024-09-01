import { Manifest } from "deno-slack-sdk/mod.ts";
import { WeatherAnnouncementDefinition } from "./functions/weather_functions.ts";
import { WeatherAnnouncementWorkflow }from "./workflows/weather_workflows.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "", //TODO: change to YOUR_NAME-weather-app
  description: "A template for creating a weather report in the #weather-report channel",
  icon: "assets/weather.png",
  functions: [WeatherAnnouncementDefinition],
  outgoingDomains: ["api.open-meteo.com"],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
  ],
  workflows: [WeatherAnnouncementWorkflow],
});
