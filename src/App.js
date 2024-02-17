import { useState } from "react";

const data = [
  {
    id: 118836,
    name: "Clark",
    img: "https://i.pravatar.cc/48?u=118836",
    alt: "Avatar",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    img: "https://i.pravatar.cc/48?u=933372",
    alt: "Avatar",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    img: "https://i.pravatar.cc/48?u=499476",
    alt: "Avatar",
    balance: 0,
  },
];
function Friend({ item, setBillOpen, billopen, setAddfriendopen }) {
  function handleSelectedFriend(itemId) {
    setBillOpen((prevbillopen) => (prevbillopen?.id === itemId ? null : item));
    setAddfriendopen(false);
  }
  return (
    <div className="sidebar">
      <img src={item.img} alt={item.alt}></img>
      <div>
        <p>{item.name}</p>
        <p
          className={
            item.balance > 0 ? "green" : item.balance < 0 ? "red" : "blue"
          }
        >
          {item.balance === 0
            ? `you and ${item.name} are even`
            : `${
                item.balance > 0
                  ? `${item.name} owes you ${item.balance}`
                  : `You owe ${item.balance} to ${item.name}`
              }`}
        </p>
      </div>
      <button onClick={() => handleSelectedFriend(item.id)}>
        {item.id === billopen?.id ? "Close" : "Select"}
      </button>
    </div>
  );
}

function FormSplitBill({
  billopen,
  handleSubmit,
  bill,
  setBill,
  expense,
  setExpense,
  payer,
  setPayer,
  temp,
}) {
  return (
    <div>
      {billopen && (
        <div>
          <h3>SPLIT A BILL WITH {`${billopen.name.toUpperCase()}`}</h3>
          <div>
            <label>Bill value</label>
            <input
              type="text"
              value={bill}
              placeholder="Amount..."
              onChange={(e) => setBill(+e.target.value)}
            ></input>
          </div>
          <div>
            <label>Your expense</label>
            <input
              type="text"
              placeholder="Amount..."
              value={expense}
              onChange={(e) => setExpense(+e.target.value)}
            ></input>
          </div>
          <div>
            <label>{billopen.name}'s expense</label>
            <input type="text" value={temp} disabled></input>
          </div>
          <div>
            <label>Who is paying the bill</label>
            <select value={payer} onChange={(e) => setPayer(e.target.value)}>
              <option value="user">You</option>
              <option value={billopen.name}>{billopen.name}</option>
            </select>
          </div>
          <button onClick={handleSubmit}>Split bill</button>
        </div>
      )}
    </div>
  );
}
function Addfriend({ addfriendopen, handleAddfriend, setFriends }) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("https://i.pravatar.cc/48");
  function handleAdd() {
    if (!name || !imgUrl) return;
    const id = crypto.randomUUID();
    const friend = {
      id: { id },
      name,
      img: `${imgUrl}?u=${id}`,
      balance: 0,
    };
    setFriends((friends) => [...friends, friend]);
    setImgUrl("https://i.pravatar.cc/48");
    setName("");
  }

  return (
    <div>
      {addfriendopen && (
        <div className="addfriendcontainer">
          <div>
            <lable>👫Friend name</lable>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div>
            <lable>⛰image URL</lable>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            ></input>
          </div>
          <button onClick={handleAdd}>Add</button>
        </div>
      )}
      <button onClick={handleAddfriend}>
        {addfriendopen ? "close" : "Add friend"}
      </button>
    </div>
  );
}

function App() {
  const [friends, setFriends] = useState(data);
  const [addfriendopen, setAddfriendopen] = useState(false);
  const [billopen, setBillOpen] = useState(null);
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const [payer, setPayer] = useState("user");

  function handleSubmit() {
    const updatedBalance =
      payer === "user"
        ? billopen.balance + (bill - expense)
        : billopen.balance - expense;
    setFriends((prevfriends) =>
      prevfriends.map((item) =>
        item.id === billopen.id ? { ...item, balance: updatedBalance } : item
      )
    );
    setBillOpen(null);
  }

  function handleAddfriend() {
    setAddfriendopen(!addfriendopen);
    setBillOpen(null);
  }
  const temp = bill - expense;
  return (
    <div className="App">
      <div className="sidebar-container">
        <div>
          {friends.map((item) => (
            <div key={item.id}>
              <Friend
                setAddfriendopen={setAddfriendopen}
                item={item}
                setBillOpen={setBillOpen}
                billopen={billopen}
              />
            </div>
          ))}
        </div>
        <Addfriend
          addfriendopen={addfriendopen}
          handleAddfriend={handleAddfriend}
          setFriends={setFriends}
        />
      </div>
      <FormSplitBill
        billopen={billopen}
        handleSubmit={handleSubmit}
        setBill={setBill}
        setExpense={setExpense}
        setPayer={setPayer}
        temp={temp}
      />
    </div>
  );
}

export default App;
