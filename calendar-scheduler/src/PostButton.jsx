function PostButton({ title, onClick }) {
  return (
    <button onClick={onClick}>
      {title}
    </button>
  );
}

export default PostButton;