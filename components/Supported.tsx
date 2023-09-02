const Supported = () => {
  return (
    <section className="max-w-8xl to-50 flex-col mx-auto mt-10 w-full rounded-3xl flex  md:flex-row md:justify-between justify-center md:items-start items-center border border-slate-900 px-4 dark:bg-transparent dark:border-lg sm:px-16 ">
      <div className="flex h-min px-2  flex-col justify-center gap-8 py-12">
        <h1 className="font-heading max-w-3xl text-3xl font-bold sm:text-6xl">
          Helped a{" "}
          <span className="from-blue-400 bg-gradient-to-br to-purple-600 bg-clip-text font-black uppercase text-transparent">
            MIllions of{" "}
          </span>
          #community
        </h1>
        <div className="flex flex-col gap-10 font-semibold sm:flex-row sm:gap-20">
          <div className="flex flex-col items-center justify-center rounded-lg  border border-gray-900 px-16 py-4 transition-colors duration-500 hover:border-gray-800">
            <div>
              <h1 className="font-heading bg-gradient-to-bl from-purple-500 to-brand-700 bg-clip-text text-5xl font-black text-transparent ">
                10k
              </h1>
              <p className="text-md  font-thin opacity-75">Students</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg  border border-gray-900 px-16 py-4 transition-colors duration-500 hover:border-gray-800">
            <div>
              <h1 className="font-heading bg-gradient-to-tr from-purple-500 to-brand-700 bg-clip-text text-5xl font-black text-transparent ">
                100+
              </h1>
              <p className="text-md  font-thin opacity-75">Teachers</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg  border border-gray-900 px-16 py-4 transition-colors duration-500 hover:border-gray-800">
            <div>
              <h1 className="font-heading bg-gradient-to-br from-purple-500 to-brand-700 bg-clip-text text-5xl font-black text-transparent ">
                10+
              </h1>

              <p className="text-md font-thin opacity-75">Maintainer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Supported;
