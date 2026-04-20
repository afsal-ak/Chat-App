import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { ChatRoomItem } from "@/components/chat/ChatRoomItem";
import { ChatListHeader } from "@/components/chat/ChatListHeader";
import UserSearchForChat from "@/components/chat/UserSearchForChat";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import type { IChatRoom } from "@/types/IMessage";
import { useTotalUnreadCount } from "@/hooks/useTotalUnreadCount";

interface ChatListProps {
  onRoomSelect: (room: IChatRoom) => void;
  selectedRoomId?: string;
}

export const ChatList = ({ onRoomSelect, selectedRoomId }: ChatListProps) => {
  const rooms = useSelector((state: RootState) => state.chatRoom.rooms);
  const currentUserId = useSelector(
    (state: RootState) => state.userAuth.user?._id
  );

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const totalUnread = useTotalUnreadCount(currentUserId!);

  const filteredRooms = rooms.filter((room) => {
    const otherParticipant =
      room.participants.find((p) => p._id !== currentUserId) ||
      room.participants[0];

    const searchTerm = search.toLowerCase();

    return (
      otherParticipant?.username?.toLowerCase().includes(searchTerm) ||
      (room.isGroup && room.name?.toLowerCase().includes(searchTerm)) ||
      (room.lastMessageContent || "").toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="bg-white flex flex-col h-full border-r">

      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <ChatListHeader role="user" totalUnread={totalUnread} />

        {/* SEARCH BUTTON */}
        {!showSearch && (
          <div className="px-3 py-3">
            <button
              onClick={() => setShowSearch(true)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition"
            >
              <MessageCircle size={18} />
              Search User
            </button>
          </div>
        )}

        {/* SEARCH PANEL */}
        {showSearch && (
          <div className="px-3 py-3 border-t">

            {/* TOP BAR */}
            <div className="flex items-center justify-between mb-2">

              <p className="text-sm font-semibold text-gray-700">
                Search Users
              </p>

              <button
                onClick={() => setShowSearch(false)}
                className="p-1 rounded-full hover:bg-gray-200 transition"
              >
                <X size={18} className="text-gray-600" />
              </button>

            </div>

            <UserSearchForChat
              onRoomCreated={() => {}}
              onUserSelected={() => setShowSearch(false)}
            />
          </div>
        )}
      </div>

      {/* CHAT ROOM LIST */}
      <div className="flex-1 overflow-y-auto">
        {filteredRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500 px-4">
            <MessageCircle className="w-8 h-8 mb-2 text-gray-300" />
            <p className="text-sm text-center">
              No conversations found
            </p>
          </div>
        ) : (
          filteredRooms.map((room) => (
            <div
              key={room._id}
              onClick={() => onRoomSelect(room)}
              className={`cursor-pointer ${
                selectedRoomId === room._id
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <ChatRoomItem
                room={room}
                currentUserId={currentUserId!}
                onSelect={onRoomSelect}
                isSelected={selectedRoomId === room._id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};