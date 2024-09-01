import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/automation/functions/custom
 */

// Step 1: Fill out the function definition

export const WeatherAnnouncementDefinition = DefineFunction({
  callback_id: "",   //TODO: fill out the call_back id with YOUR_NAME_weather_function
  title: "", //TODO: fill out title with YOUR_NAME's Weather Announcement
  description: "Function to send weather announcement",
  source_file: "functions/weather_functions.ts",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
        description: "channel to send message to",
      },
    },
    required: ["channel"],
  },
  output_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
        description: "channel to send message to",
      },
    },
    required: ["channel"],
  },
});

/**
 * SlackFunction takes in two arguments: the CustomFunction
 * definition (see above), as well as a function that contains
 * handler logic that's run when the function is executed.
 * https://api.slack.com/automation/functions/custom
 */
export default SlackFunction(
  WeatherAnnouncementDefinition,
  async ({ inputs,client }) => {
    const { channel } = inputs;
    console.log(channel)

    const weather =  await fetch("https://api.open-meteo.com/v1/forecast?latitude=38.029305&longitude=-78.476677&current=temperature_2m,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph")
    
    const weatherJSON = await weather.json()
    
    console.log(weatherJSON) //TODO: see what the response is
    
    const formattedMessage = await `:zap: The current temperature: ${JSON.stringify(weatherJSON.current.temperature_2m)}F`; //TODO: customize the message with the information you want!

    await client.chat.postMessage({
      channel: channel,
      text: formattedMessage,
    });

    // Outputs are made available as variables for use in subsequent functions
    return { outputs: { channel } };
  },
);
