const EnterKeyModalContent = () => {
  return (
    <div className="w-full h-full text-center border border-teal-600 bg-teal-600/10 backdrop-blur-lg p-6 rounded-2xl text-teal-600 pointer-events-auto">
      <div className="relative">
        <div className="bg-teal-600 h-0.5 w-4 absolute top-1.5 left-0"></div>
        <h2 className="text-xs font-semibold">AUTHORIZED ACCESS ONLY</h2>
        <div className="bg-teal-600 h-0.5 w-4 absolute top-1.5 right-0"></div>
      </div>
      <h2 className="text-3xl font-semibold my-6">Enter Code</h2>
      <div className="border border-teal-600 p-4 rounded-md max-w-50 w-full mx-auto">
        2345_
      </div>
      <div className="max-w-sm mx-auto my-8">
        <div className="grid grid-cols-3 gap-4 justify-self-center">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((key) => (
            <button className="border w-14 h-14 rounded-full flex items-center justify-center hover:bg-teal-600/50 cursor-pointer transition-all duration-200">
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnterKeyModalContent;
