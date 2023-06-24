const url = "https://programming-memes-images.p.rapidapi.com/v1/memes";
const optionsTwo = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f64ba3f85amshea55c2c52501191p1a7970jsn5046b8971a18",
    "X-RapidAPI-Host": "programming-memes-images.p.rapidapi.com",
  },
};

const codingMeme = document.getElementById("memeDiv");

fetch(url, optionsTwo)
  .then((resp) => {
    console.log("hellooooo", resp.body);
    return resp.body;
  })
  .then((rb) => {
    const reader = rb.getReader();
    return new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log("done", done);
              controller.close();
              return;
            }

            controller.enqueue(value);

            console.log(done, value);
            push();
          });
        }

        push();
      },
    });
  })
  .then((stream) =>
    new Response(stream, { headers: { "Content-Type": "text/html" } }).json()
  )
  .then((result) => {
    console.log("My Result", result);
    for (let i = 0; i < result.length; i++) {
      let cur = result[i];
      let memeImg = document.createElement("img");
      memeImg.setAttribute("src", cur.image);
      codingMeme.appendChild(memeImg);
    }
  });
