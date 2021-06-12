const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");

export default async (req, res) => {
  // Array with page links
  const links = [
    { url: "/", changefreq: "daily", priority: 1 },
    { url: "/featured", changefreq: "daily", priority: 0.3 },
    { url: "/recent", changefreq: "daily", priority: 0.3 },
    { url: "/search", changefreq: "daily", priority: 0.3 },
  ];

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  // Setting headers
  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};
