function UserProfile(props) {
    return (
        <div className="user-profile">
            <h2>{props.name}</h2>
            <p>Age: {props.age}</p>
            <p>Bio: {props.bio}</p>
        </div>
    );
}


function UserProfile({ name, age, bio }) {
    return (
        <div className="user-profile">
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>Bio: {bio}</p>
        </div>
    );
}

export default UserProfile;