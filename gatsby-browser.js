const React = require('react');
const { HeadProvider } = require('react-head');

exports.wrapRootElement = ({ element }) => {
  return <HeadProvider>{element}</HeadProvider>;
};
