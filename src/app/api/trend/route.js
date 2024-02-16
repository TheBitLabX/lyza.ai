const googleTrendsApi = require("google-trends-api");

export async function GET(request) {
  try {
    // Fetch Google Trends data
    const options = {
      keyword: "live",
      startTime: new Date("2024-01-09"),
      geo: "GB",
      property: "youtube", // or any other country code
    };

    const data = await googleTrendsApi.interestOverTime(options);
    console.log(data);

    // Extracting the trend score for the latest date

    // Respond with the Google Trends data and update the token cookie
    return new Response(data, {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);

    // Respond with an error message and status code
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
}
