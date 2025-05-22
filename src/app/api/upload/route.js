export async function POST(req) {
  try {
    const { image } = await req.json();

    const response = await fetch("https://serverless.roboflow.com/infer/workflows/jmworkspace/custom-workflow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: process.env.ROBOFLOW_API_KEY,
        inputs: {
          image: {
            type: "base64",
            value: image.split(",")[1]
          }
        }
      })
    });

    const result = await response.json();

    const prediction = result?.outputs?.[0]?.model_predictions;
    console.log(result);

    if (!prediction) {
      return Response.json({ message: "No prediction returned" }, { status: 500 });
    }

    console.log("prediction: ", prediction.top.trim(), "(" + prediction.confidence + ")");

    return Response.json({
      illness: prediction.top.trim(), // remove extra space just in case
      confidence: (prediction.confidence * 100).toFixed(1) + "%"
});


  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}