export function TagButton({ tag, selectedTags, dispatch }) {
  const isSelected = selectedTags.includes(tag);

  const handleTagClick = () => {
    dispatch({
      type: isSelected ? "removeTag" : "addTag",
      payload: tag,
    });
  };

  return (
    <button
      type="button"
      onClick={handleTagClick}
      className={isSelected ? "selectedTag" : "tagButton"}
    >
      {tag}
    </button>
  );
}
