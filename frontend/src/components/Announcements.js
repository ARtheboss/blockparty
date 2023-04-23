
function Announcements(props) {
    let as = [];
    props.list.forEach(function(a){
        as.push((<Announcement key={a.id} announcement={a}/>))
    });
    return (
        <div className='announcements'>
            <h1>My Announcements</h1>
            { as }
        </div>
    );
}

function Announcement(props){
    let a = props.announcement;
    return (
        <div className='announcement'>
            <div className='host-info'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Person_icon_%28the_Noun_Project_2817719%29.svg/1200px-Person_icon_%28the_Noun_Project_2817719%29.svg.png'/>
                <br/><b>@{a.tag}</b>
            </div>
            <div className='announcement-content'>
                <b>{a.title}</b><br/>
                {a.body}
            </div>
        </div>
    )
}

export default Announcements;