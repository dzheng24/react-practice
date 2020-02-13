"use strict";

(function () {
  "use strict";

  const CONFIG = {
    apiUrl: 'http://localhost/status_api'
  };

  function PostForm(props) {
    var typeOptions = Object.keys(props.messageTypes).map(function (key) {
      if (props.messageTypes.hasOwnProperty(key)) {
        return React.createElement("option", {
          key: key,
          value: key
        }, props.messageTypes[key]);
      }
    }); // so we don't have to type this over and over

    var defaultType = typeOptions[0].key;
    return React.createElement("form", null, React.createElement("h3", null, "Post an Update"), React.createElement("div", {
      className: "field-group"
    }, React.createElement("label", {
      htmlFor: "txt-message"
    }, "Message"), React.createElement("textarea", {
      id: "txt-message",
      rows: "2"
    })), React.createElement("div", {
      className: "field-group"
    }, React.createElement("label", {
      htmlFor: "txt-type"
    }, "Type"), React.createElement("select", {
      id: "txt-type"
    }, typeOptions)), React.createElement("div", {
      className: "field-group action"
    }, React.createElement("input", {
      type: "submit",
      value: "Post Update"
    })));
  }

  function StatusMessage(props) {
    var statusDate = date.parse(props.time, "YYYY-MM-DD, HH:mm"),
        dateFormat = "M/D/Y, h:mm A";
    return React.createElement("div", {
      className: "status-message"
    }, props.msg, React.createElement("span", {
      className: "name"
    }, "\u2014\xA0", props.type), React.createElement("span", {
      className: "time"
    }, date.format(statusDate, dateFormat)));
  }

  function StatusMessageList(props) {
    const [statuses, setStatuses] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
      retrieveStatusMessages();
    }, []);

    function retrieveStatusMessages() {
      axios.get(CONFIG.apiUrl + '/get.php?delay=5').then(response => {
        setStatuses(response.data);
        setLoaded(true);
      });
    }

    function displayStatusMessages() {
      return statuses.map(function (status) {
        return React.createElement("li", {
          key: status.id
        }, React.createElement(StatusMessage, {
          msg: status.msg,
          type: props.messageTypes[status.type],
          time: status.time
        }));
      });
    }

    if (loaded) {
      return React.createElement("ul", {
        id: "status-list"
      }, displayStatusMessages());
    } else {
      return React.createElement("div", {
        id: "status-list",
        className: "loading"
      }, "Loading...", React.createElement("div", {
        className: "spinner"
      }, React.createElement("div", {
        className: "bounce1"
      }), React.createElement("div", {
        className: "bounce2"
      }), React.createElement("div", {
        className: "bounce3"
      })));
    }
  }

  function StatusMessageManager(props) {
    var messageTypes = {
      management: "Management",
      dining: "Dining Services",
      ops: "Operations",
      plumbing: "Plumbing",
      pool: "Pool"
    };
    return React.createElement(React.Fragment, null, React.createElement("div", {
      id: "post-status"
    }, React.createElement(PostForm, {
      messageTypes: messageTypes
    })), React.createElement(StatusMessageList, {
      messageTypes: messageTypes
    }));
  }

  ReactDOM.render(React.createElement(StatusMessageManager, null), document.getElementById("react-statusmanager"));
})();
//# sourceMappingURL=hotel-dist.js.map