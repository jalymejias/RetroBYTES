import Avatar from "../avatar";
import { useState } from "react";
import { useEffect } from "react";

const EditableAvatar = ({ avatar, name, imageInputRef }) => {
  const [newAvatar, setNewAvatar] = useState(avatar);
  const [didUserUpdateAvatar, setDidUserUpdateAvatar] = useState(false);
  useEffect(()=>{
    setNewAvatar(avatar)
  }, [avatar])
  return (
    <div className="editable_avatar">
      <label htmlFor="avatar">
        {!didUserUpdateAvatar ? (
          <Avatar avatar={newAvatar} name={name} />
        ) : (
          <img
            className="user_avatar"
            src={newAvatar}
            alt={`Nuevo avatar de ${name}`}
          />
        )}
      </label>
      <input
        ref={imageInputRef}
        type="file"
        id="avatar"
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e) => {
          setDidUserUpdateAvatar(true);
          setNewAvatar(URL.createObjectURL(e.target.files[0]));
        }}
      />
    </div>
  );
};

export default EditableAvatar;