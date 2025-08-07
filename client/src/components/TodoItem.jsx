export default function TodoItem({
  items,
  onDeleteClick,
  onMarkClick,
  editingTaskId,
  editingTaskData,
  onStartEdit,
  onCancelEdit,
  onEditChange,
  onSaveEdit,
}) {
  if (!items.length) {
    return <div className="text-center text-gray-400">No tasks to display.</div>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isEditing = item.id === editingTaskId;

        return (
          <div
            key={item.id}
            className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md flex justify-between items-start flex-col md:flex-row md:items-center gap-4"
          >
            {isEditing ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  name="title"
                  value={editingTaskData.title}
                  onChange={onEditChange}
                  className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  placeholder="Task Title"
                />
                <input
                  type="date"
                  name="due_date"
                  value={editingTaskData.due_date}
                  onChange={onEditChange}
                  className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
                <textarea
                  name="description"
                  value={editingTaskData.description}
                  onChange={onEditChange}
                  className="md:col-span-2 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  placeholder="Description"
                />
                <select
                  name="status"
                  value={editingTaskData.status}
                  onChange={onEditChange}
                  className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <div className="md:col-span-2 flex flex-wrap gap-2 mt-2">
                  <button
                    onClick={onSaveEdit}
                    className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-semibold text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={onCancelEdit}
                    className="px-4 py-1 bg-gray-600 hover:bg-gray-700 rounded-full text-sm font-semibold text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <div
                    className={`text-lg font-semibold ${
                      item.status === "done" ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="text-sm text-gray-300 italic mt-1">
                      {item.description}
                    </div>
                  )}
                  <div className="text-sm text-gray-400 mt-1">
                    Due: {(() => {
                      const date = new Date(item.due_date);
                      const day = String(date.getDate()).padStart(2, "0");
                      const month = [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                      ][date.getMonth()];
                      const year = date.getFullYear();
                      return `${day}-${month}-${year}`;
                    })()}
                  </div>
                  <div className="text-xs text-yellow-400 mt-1 capitalize">
                    Status: {item.status}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onMarkClick(item.id)}
                    className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-full text-sm font-semibold text-white"
                  >
                    Next Status
                  </button>
                  <button
                    onClick={() => onDeleteClick(item.id)}
                    className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-full text-sm font-semibold text-white"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onStartEdit(item)}
                    className="px-4 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-full text-sm font-semibold text-white"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
