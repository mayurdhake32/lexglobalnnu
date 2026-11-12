import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Bookmark, ArrowRight, Trash2, BookOpen } from 'lucide-react';

export const BookmarksDrawer: React.FC = () => {
  const { bookmarksDrawerOpen, setBookmarksDrawerOpen, bookmarks, posts, toggleBookmark, navigateTo } = useApp();

  if (!bookmarksDrawerOpen) return null;

  const bookmarkedPosts = posts.filter((p) => bookmarks.includes(p.id));

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A1D37]/50 backdrop-blur-sm flex justify-end animate-in fade-in"
      onClick={() => setBookmarksDrawerOpen(false)}
    >
      <div
        className="w-full max-w-md bg-[#FCFAF5] h-full shadow-2xl border-l border-[#0A1D37]/15 flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#0A1D37]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#B08D57]/15 text-[#B08D57]">
              <Bookmark className="w-5 h-5 fill-[#B08D57]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0A1D37]">Saved Reading List</h3>
              <p className="text-xs text-[#5E6A7A]">
                {bookmarkedPosts.length} article{bookmarkedPosts.length === 1 ? '' : 's'} saved for offline reference
              </p>
            </div>
          </div>
          <button
            onClick={() => setBookmarksDrawerOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#0A1D37]/10 text-[#5E6A7A] hover:text-[#0A1D37]"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarkedPosts.length === 0 ? (
            <div className="py-20 text-center px-4">
              <div className="w-12 h-12 rounded-full bg-[#0A1D37]/5 flex items-center justify-center mx-auto text-[#5E6A7A] mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-semibold text-base text-[#0A1D37]">Your list is empty</h4>
              <p className="text-xs text-[#5E6A7A] mt-1 max-w-xs mx-auto">
                Click the bookmark icon on any legal guide or article to save it for later reading.
              </p>
              <button
                onClick={() => {
                  setBookmarksDrawerOpen(false);
                  navigateTo('blogs');
                }}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[#0A1D37] text-white hover:bg-[#0F2647]"
              >
                Browse Articles
              </button>
            </div>
          ) : (
            bookmarkedPosts.map((post) => (
              <div
                key={post.id}
                className="p-3.5 rounded-xl bg-white border border-[#0A1D37]/10 hover:border-[#B08D57]/40 shadow-sm transition-all group flex gap-3 items-start"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B08D57]">
                    {post.category}
                  </span>
                  <h4
                    onClick={() => {
                      navigateTo('blog-detail', post.slug);
                      setBookmarksDrawerOpen(false);
                    }}
                    className="font-serif font-semibold text-sm text-[#0A1D37] hover:text-[#B08D57] cursor-pointer line-clamp-2 leading-snug mt-0.5"
                  >
                    {post.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#0A1D37]/5 text-xs text-[#5E6A7A]">
                    <span>{post.readTime}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBookmark(post.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          navigateTo('blog-detail', post.slug);
                          setBookmarksDrawerOpen(false);
                        }}
                        className="text-[#0A1D37] hover:text-[#B08D57] font-semibold text-xs flex items-center gap-1"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarkedPosts.length > 0 && (
          <div className="p-4 bg-[#F7F3EB] border-t border-[#0A1D37]/10 flex items-center justify-between text-xs text-[#5E6A7A]">
            <span>Stored in your local session</span>
            <button
              onClick={() => {
                setBookmarksDrawerOpen(false);
                navigateTo('blogs');
              }}
              className="font-semibold text-[#B08D57] hover:underline"
            >
              Explore More Articles →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
