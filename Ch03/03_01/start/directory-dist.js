"use strict";

(function () {
  "use strict";

  class Directory extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        people: window.LMDirectory.people
      };
    }

    render() {
      return React.createElement("div", {
        className: "company-directory"
      }, React.createElement("h2", null, "Company Directory"), React.createElement("p", null, "Learn more about each person at Leaf & Mortar in this company directory."), React.createElement(Filters, null), React.createElement(People, {
        people: this.state.people
      }));
    }

  }

  ReactDOM.render(React.createElement(Directory, null), document.getElementById('directory-root'));
})();
//# sourceMappingURL=directory-dist.js.map