const Home = () => {
  return (
    <div className="flex justify-center w-full py-32 bg-yellow-200">
      <div className="w-11/12 max-w-screen-2x">
        <h1 className=" text-4xl font-bold">Order cake to your door</h1>
        <form className=" flex items-center gap-2 mt-10 text-md">
          <input className=" outline-none py-3 px-4 w-96 shadow-sm transition duration-300 border-b-2 border-b-white focus:border-b-black" />
          <button className="font-semibold rounded py-3 px-4 shadow-sm bg-black text-white">
            Find
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
