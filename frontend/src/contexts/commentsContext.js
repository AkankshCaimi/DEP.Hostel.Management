import React, {useContext, useState, useEffect} from "react";
import axios from "axios";

const commentsContext = React.createContext();

export function useComments() {
    return useContext(commentsContext);
}

export function CommentsProvider({children}) {
    const [comments, setComments] = useState({});
    const [commentSection, setCommentSection] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    // const [comment, setComment] = useState(null);
    return (
        <commentsContext.Provider value={{comments, setComments, selectedOptions, setSelectedOptions, commentSection, setCommentSection}}>
            {children}
        </commentsContext.Provider>
    );
}