import { formatDate } from "../utils/formatDate";

export const makeAssignment = (name, state, start, end, selectedWg) => ({
    assigName: name,
    assigDatestart: formatDate(start, "yyyy-mm-dd"),
    assigDateEnd: formatDate(end, "yyyy-mm-dd"),
    assigState: state,
    assigStarter: null,
    assigMem: [],
    assigWorkgroup: null,
    assigGrade: 0,
});
