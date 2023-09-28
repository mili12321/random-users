import React, { useEffect, useState } from "react";
import "./List.scss";
import { useUsersStore } from "../../store/useUsersStore";
import { User } from "../../types";

export const List = () => {
  const { users, currentUser, removeUser, getuser } = useUsersStore(
    (state) => state
  );

  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const onSelectUser = (id: string) => {
    const isSelected = currentUser?.id === id;
    isSelected ? getuser(null) : getuser(id);
  };

  const onRemoveUser = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();
    const isSelected = currentUser?.id === id;
    if (isSelected) {
      getuser(null);
    }
    removeUser(id);
  };

  return (
    <div className="list-container">
      <Search setFilteredUsers={setFilteredUsers} />
      {users.length === 0 ? (
        <div>Empty List</div>
      ) : (
        <div className="list">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`user-item ${
                currentUser?.id === user.id ? "selected" : ""
              }`}
              onClick={() => onSelectUser(user.id)}
            >
              <div className="name">{user.name}</div>
              <div
                className="remove-btn"
                onClick={(event) => onRemoveUser(event, user.id)}
              >
                x
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Search = ({
  setFilteredUsers,
}: {
  setFilteredUsers: (filteredUsers: User[]) => void;
}) => {
  const { users } = useUsersStore((state) => state);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const newUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredUsers(newUsers);
  }, [searchValue, users, setFilteredUsers]);

  return (
    <input
      className="search"
      type="text"
      placeholder="search user"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
};
