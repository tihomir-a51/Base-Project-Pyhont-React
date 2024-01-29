const Home = () => {
    const token = localStorage.getItem("token")
    return (
        <div className="home">
            <h2>{token}</h2>
        </div>
    );
}

export default Home;