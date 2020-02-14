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
    const [messageText, setMessageText] = React.useState('');
    const [messageType, setMessageType] = React.useState(defaultType);

    function onTextChange(e) {
      setMessageText(e.target.value);
    }

    function onTypeChange(e) {
      setMessageType(e.target.value);
    }

    function postStatusUpdate(evt) {
      evt.preventDefault();
      var newStatus = {
        msg: messageText,
        type: messageType,
        time: date.format(new Date(), "YYYY-MM-DD, HH:mm")
      };
      axios.post(CONFIG.apiUrl + "/post.php", newStatus).then(function (response) {
        if (response.data.success) {
          // Update state (list of messages)
          newStatus.id = response.data.id;
          props.addStatusMessage(newStatus);
          setMessageText('');
          setMessageType(defaultType);
        }
      });
    }

    return React.createElement("form", {
      onSubmit: postStatusUpdate
    }, React.createElement("h3", null, "Post an Update"), React.createElement("div", {
      className: "field-group"
    }, React.createElement("label", {
      htmlFor: "txt-message"
    }, "Message"), React.createElement("textarea", {
      id: "txt-message",
      rows: "2",
      onChange: onTextChange,
      value: messageText
    })), React.createElement("div", {
      className: "field-group"
    }, React.createElement("label", {
      htmlFor: "txt-type"
    }, "Type"), React.createElement("select", {
      id: "txt-type",
      onChange: onTypeChange,
      value: messageType
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

    function deleteMessage(e) {
      e.preventDefault();
      console.log(e);
    }

    return React.createElement("div", {
      className: "status-message"
    }, props.msg, React.createElement("span", {
      className: "name"
    }, "\u2014\xA0", props.type), React.createElement("span", {
      className: "time"
    }, date.format(statusDate, dateFormat)), React.createElement("input", {
      type: "submit",
      value: "Delete Message",
      onClick: deleteMessage
    }));
  }

  function StatusMessageList(props) {
    function displayStatusMessages() {
      return props.statuses.map(function (status) {
        return React.createElement("li", {
          key: status.id
        }, React.createElement(StatusMessage, {
          msg: status.msg,
          type: props.messageTypes[status.type],
          time: status.time
        }));
      });
    }

    if (props.loaded) {
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
    const [statuses, setStatuses] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
      retrieveStatusMessages();
    }, []);

    function retrieveStatusMessages() {
      axios.get(CONFIG.apiUrl + '/get.php').then(response => {
        setStatuses(response.data);
        setLoaded(true);
      });
    }

    function addStatusMessage(status) {
      let updatedStatuses = statuses.slice(0); //this will make a copy of the statuses

      updatedStatuses.push(status);
      setStatuses(updatedStatuses);
    }

    return React.createElement(React.Fragment, null, React.createElement("div", {
      id: "post-status"
    }, React.createElement(PostForm, {
      messageTypes: messageTypes,
      addStatusMessage: addStatusMessage
    })), React.createElement(StatusMessageList, {
      messageTypes: messageTypes,
      statuses: statuses,
      loaded: loaded
    }));
  }

  ReactDOM.render(React.createElement(StatusMessageManager, null), document.getElementById("react-statusmanager"));
})();
//# sourceMappingURL=hotel-dist.js.map