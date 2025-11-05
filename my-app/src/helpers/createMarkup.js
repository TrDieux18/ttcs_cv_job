export const createMarkup = (htmlString) => {
  const allowedTags =
    /<b>|<i>|<u>|<ul>|<ol>|<li>|<p>|<br>|<div>|<strong>|<em>/gi;
  const sanitized = htmlString
    ?.replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/onerror|onload|onclick|onmouseover|onfocus|onblur/gi, "")
    .replace(/<style.*?>.*?<\/style>/gi, "")
    .replace(/<link.*?>/gi, "")
    .replace(/<.*?>/g, (tag) => (allowedTags.test(tag) ? tag : ""));
  return { __html: sanitized || "" };
};
