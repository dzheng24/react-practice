"use strict";

(function () {
  "use strict";

  function Person(props) {
    return React.createElement("div", {
      className: "person"
    }, React.createElement("h3", null, props.person.name, ", ", props.person.title), React.createElement("p", null, React.createElement("img", {
      className: "size-medium alignright",
      src: props.person.img,
      alt: props.person.name,
      width: "300",
      height: "300",
      sizes: "(max-width: 300px) 100vw, 300px"
    }), props.person.bio));
  }

  function People(props) {
    return React.createElement("div", {
      className: "results"
    }, props.people.map(function (person) {
      return React.createElement(Person, {
        key: person.id,
        person: person
      });
    }));
  }

  function Filters(props) {
    return React.createElement("form", {
      action: "",
      id: "directory-filters"
    }, React.createElement("p", null, "filters go here"));
  }

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