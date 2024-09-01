/**
 * A workflow is a set of steps that are executed in order
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 *
 */

import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { WeatherAnnouncementDefinition } from "../functions/weather_functions.ts";

export const WeatherAnnouncementWorkflow = DefineWorkflow({
  callback_id: "", //TODO: change callback_id to YOUR_NAME_weather_workflow
  title: "",//TODO: change to YOUR_NAME's weather announcement
  description:
    "This will send a weather report when triggered",
  input_parameters: {
    properties: {
      created_by: {
        type: Schema.types.string,
      },
    },
    required: [],
  },
});

WeatherAnnouncementWorkflow
    .addStep(WeatherAnnouncementDefinition ,{
      channel: "" //TODO: add channel id here (given in instructions)
    })


export default WeatherAnnouncementWorkflow;