FROM denoland/deno
COPY . /solution
WORKDIR /solution

RUN deno cache main.ts

CMD ["deno", "run", "--allow-read", "main.ts"]
