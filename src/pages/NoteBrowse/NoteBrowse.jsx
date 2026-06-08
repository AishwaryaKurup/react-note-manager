import { TextCard } from "../../components/TextCard/TextCard";

export function NoteBrowse(props){
    return <>
        <TextCard
            title="Super note"
            subtitle="01/01/2026"
            content="bla bla bla bla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla blabla bla bla"
            onClick={()=> alert("OnClick !")}
            onClickTrash={()=> alert("OnClickTrash !")}

        />
    </>;
}