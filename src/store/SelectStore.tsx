import { create } from "zustand";
import { CommentProps } from "../interface";

type LikeComments = {
  [key: string]: string;
};

interface State {
  likesCount: number;
  maxLikes: number;
  isAllSelected: boolean;
  likeComments: LikeComments;
}

interface Actions {
  loadMaxLikes: (count: number) => void;
  check: (key: string, value: string) => void;
  uncheck: (key: string) => void;
  selectAll: (comments: CommentProps[]) => void;
  unSelectAll: () => void;
}

const initialState: State = {
  likesCount: 0,
  maxLikes: 0,
  isAllSelected: false,
  likeComments: {},
};

export const useSelectStore = create<State & Actions>((set, get) => ({
  ...initialState,

  loadMaxLikes: (count) =>
    set(() => ({
      maxLikes: count,
    })),

  check: (key, value) =>
    set(({ likeComments, likesCount, maxLikes }) => ({
      likeComments: { ...likeComments, [key]: value },
      likesCount: likesCount + 1,
      isAllSelected: likesCount + 1 === maxLikes,
    })),

  uncheck: (key) =>
    set(({ likeComments, likesCount, maxLikes }) => {
      const { [key]: toDelete, ...restLiked } = likeComments;
      return {
        likeComments: { ...restLiked },
        likesCount: likesCount - 1,
        isAllSelected: likesCount - 1 === maxLikes,
      };
    }),

  selectAll: (comments) =>
    set(() => {
      const likeComments = comments.reduce(
        (obj, comment) => ({ ...obj, [comment.id]: comment.email }),
        {}
      );
      return {
        isAllSelected: true,
        likeComments,
      };
    }),

  unSelectAll: () =>
    set(() => ({
      isAllSelected: false,
      likeComments: {},
    })),

  // isLiked: (id) => Object.keys(get().likeComments).includes(id),
}));
