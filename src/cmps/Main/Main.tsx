import { useEffect, useRef, useState } from "react";
import { InitUser } from "../../types";
import "./Main.scss";
import { useUsersStore } from "../../store/useUsersStore";

const API_RANDOM_USER = "https://randomuser.me/api/";

export const Main = () => {
  const [randomUser, setRandomUser] = useState<InitUser | null>(null);
  const { addUser, currentUser } = useUsersStore((state) => state);
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    if (currentUser) return;

    const fetchUsers = async () => {
      const res = await fetch(API_RANDOM_USER);
      const data = await res.json();
      const userData = data.results[0];
      const randomUser: InitUser = {
        name: `${userData.name.first} ${userData.name.last}`,
        email: userData.email,
        picture: userData.picture.large,
      };
      setRandomUser(randomUser);
    };
    intervalId.current = setInterval(fetchUsers, 2000);
    return () => {
      clearInterval(intervalId.current || 0);
    };
  }, [currentUser]);

  const onAddUser = () => {
    if (currentUser) return;
    randomUser && addUser(randomUser);
  };

  if (randomUser == null) return <div>Loading Random User...</div>;
  return (
    <div className="main-container">
      <UserCard data={currentUser ?? randomUser} />
      <div
        className={`add-btn ${currentUser ? "disabled" : ""}`}
        onClick={onAddUser}
      >
        +
      </div>
    </div>
  );
};

const UserCard = ({ data }: { data: InitUser }) => {
  const { picture, name, email } = data;
  return (
    <div className="user-card">
      <img className="user-picture" src={picture} alt={name + "picture"} />
      <div className="user-informatin">
        <div className="name">{name}</div>
        <div className="email">{email}</div>
      </div>
    </div>
  );
};
