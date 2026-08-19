export function Pagination() {
  return (
    <div className="join">
      <button className="join-item btn">«</button>
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="1"
        checked={true}
        onChange={() => {}}
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="2"
      />
      <button className="join-item btn btn-disabled">...</button>
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="4"
      />
      <button className="join-item btn">»</button>
    </div>
  );
}
