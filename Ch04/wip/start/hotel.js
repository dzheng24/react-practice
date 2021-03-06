(function() {
  "use strict";

  const CONFIG = {
    apiUrl: 'http://localhost/status_api'
  }

  function PostForm(props) {
    var typeOptions = Object.keys(props.messageTypes).map(function(key) {
      if (props.messageTypes.hasOwnProperty(key)) {
        return (
          <option key={key} value={key}>
            {props.messageTypes[key]}
          </option>
        );
      }
    });

    // so we don't have to type this over and over
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
    
      axios.post(CONFIG.apiUrl + "/post.php", newStatus).then(function(response) {    
        if (response.data.success) {
          // Update state (list of messages)
          newStatus.id = response.data.id;
          props.addStatusMessage(newStatus);

          setMessageText('');
          setMessageType(defaultType);
        }
      });
    }

    return (
      <form onSubmit={postStatusUpdate}>
        <h3>Post an Update</h3>

        <div className="field-group">
          <label htmlFor="txt-message">Message</label>
          <textarea id="txt-message" rows="2" onChange={onTextChange} value={messageText}/>
        </div>

        <div className="field-group">
          <label htmlFor="txt-type">Type</label>
          <select id="txt-type" onChange={onTypeChange} value={messageType}>{typeOptions}</select>
        </div>

        <div className="field-group action">
          <input type="submit" value="Post Update" />
        </div>
      </form>
    );
  }

  function StatusMessage(props) {
    var statusDate = date.parse(props.time, "YYYY-MM-DD, HH:mm"),
      dateFormat = "M/D/Y, h:mm A";

    function deleteMessage(e) {
      e.preventDefault();
      axios.get(CONFIG.apiUrl + "/get.php")
      .then(res => {
        console.log(props.id)
      })
    }

    return (
      <div className="status-message">
        {props.msg}
        <span className="name">— {props.type}</span>
        <span className="time">{date.format(statusDate, dateFormat)}</span>
        <input type="submit" value="Delete Message" onClick={deleteMessage}/>
      </div>
    );
  }

  function StatusMessageList(props) {

    function displayStatusMessages() {
      return props.statuses.map(function(status) {
        return (
          <li key={status.id}>
            <StatusMessage
              id={status.id}
              msg={status.msg}
              type={props.messageTypes[status.type]}
              time={status.time}
            />
          </li>
        );
      });
    }

    if (props.loaded) {
      return <ul id="status-list">{displayStatusMessages()}</ul>;
    } else {
      return (
        <div id="status-list" className="loading">
          Loading...
          <div className="spinner">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </div>
      );
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
      axios.get(CONFIG.apiUrl + '/get.php')
      .then(response => {
        setStatuses(response.data);
        setLoaded(true);
      })
    }

    function addStatusMessage(status) {
      let updatedStatuses = statuses.slice(0); //this will make a copy of the statuses
      updatedStatuses.push(status);
      setStatuses(updatedStatuses);
    }

    return (
      <React.Fragment>
        <div id="post-status">
          <PostForm messageTypes={messageTypes} addStatusMessage={addStatusMessage}/>
        </div>
        <StatusMessageList messageTypes={messageTypes} statuses={statuses} loaded={loaded} />
      </React.Fragment>
    );
  }

  ReactDOM.render(
    <StatusMessageManager />,
    document.getElementById("react-statusmanager")
  );
})();
