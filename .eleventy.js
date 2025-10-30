const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPassthroughCopy('./src/styles');
  eleventyConfig.addPassthroughCopy('./src/scripts');
  eleventyConfig.addPassthroughCopy('./src/images');
  eleventyConfig.addPassthroughCopy('./src/CNAME');
  eleventyConfig.addWatchTarget('./src/styles');
  eleventyConfig.addWatchTarget('./src/scripts');
  eleventyConfig.addWatchTarget('./src/images');

  eleventyConfig.addPassthroughCopy('./src/boss-name/');

  eleventyConfig.addFilter('formatDate', dateString => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      dateStyle: "full",
      timeStyle: "short"
    });
  });

  eleventyConfig.addFilter('year', dateString => {
    const date = new Date(dateString);
    return date.getFullYear();
  });

  eleventyConfig.addFilter('isUpcoming', dateString => {
    const date = new Date(dateString);
    return date >= new Date();
  });

  eleventyConfig.addFilter('upcomingCount', shows => {
    const now = new Date();
    const upcoming = shows.filter(show => {
      const date = new Date(show.date);
      return date >= now;
    });
    return upcoming.length;
  });

  return {
    // pathPrefix: '//',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};