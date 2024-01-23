import { Reply, Thread } from "@/types/threads"
import { View, StyleSheet, Image, ViewStyle, TextStyle, StyleProp, ImageStyle} from "react-native"
import { Text } from "./Themed"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { timeAgo } from "@/utils/timeAgo";




const  ThreadItem = (thread:Thread):JSX.Element => {
    return <View style={styles.container}>
        <View>
            <ProfileSection authorPic = {thread.author.photo} replies={thread.replies}/>
        </View>
        <View style={styles.threadRightSection}>
            <ThreadHeader name={thread.author.name} createdAt={thread.createdAt} />
            <ThreadContent content={thread.content}/>
            {thread.image? <ThreadImage image={thread.image}/> : null}
            <ThreadAction />
            <ThreadInfo repliesCount={thread.repliesCount} likesCount={thread.likesCount} />
        </View>
    </View>
}

const ThreadHeader = ({name,createdAt}:{name:string,createdAt:string}):JSX.Element => {
    return <View style={styles.headerContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.timeSection}>
            <Text style={styles.createdAt}>{timeAgo(createdAt)}</Text>
            <FontAwesome size={18} style={{ marginBottom: -3 }} name="ellipsis-h" color="gray" />
        </View> 
    </View>
}

const ThreadContent = ({content}:{content:string}):JSX.Element => {
    return <Text numberOfLines={4} style={styles.content}>{content}</Text>
}

const ThreadImage = ({image}:{image:string}):JSX.Element => {
    return <View style={styles.imageContainer}>
        <Image source={{uri:image}} style={styles.image} resizeMode="cover" />
    </View>
}

const ThreadAction = ():JSX.Element => {
    return <View style={styles.action}>
            <FontAwesome size={18} name="heart-o" color="gray" />
            <FontAwesome size={18} name="comment-o" color="gray" />
            <FontAwesome size={18} name="retweet" color="gray" />
            <FontAwesome size={18} name="share" color="gray" />

    </View>
}

const ThreadInfo = ({repliesCount,likesCount}:{repliesCount:number,likesCount:number}):JSX.Element => {
    return <View>
        <Text style={{fontSize:16,fontWeight:'500',color:'gray'}}>{repliesCount} replies . {likesCount} likes</Text>
    </View>
}


const ProfileSection = ({authorPic,replies}:{authorPic:string,replies:Reply[] | undefined}):JSX.Element => {
    return <View style={styles.profileSection}>
        <Image source={{uri: authorPic}} style={styles.profileImg}/>
        <View style={styles.infoLine}></View>
        <View style={styles.repliesPics}>
            {replies && replies.length > 0 && replies.slice(0,3).map((r,index) => 
                <Image source={{uri:r.author.photo}} style={
                    index === 0? styles.replyPic1 : index === 1? styles.replyPic2 :
                    styles.replyPic
                } />
            ) }
        </View>
    </View>
}


const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        gap:12,
        paddingHorizontal:8,
        // width:'100%',
        // height:'auto',
        flex:1,
        position:'relative',
        // backgroundColor:'red',
        // maxHeight:500
        
    },
    threadRightSection:{
        gap:10,
        width:'85%'
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center'
    },

    name:{
        fontWeight:'600',
        fontSize:18
    },

    createdAt:{
        color:'gray',
        fontWeight:'500'
    },

    content:{
        fontSize:17
    },

    action:{
        flexDirection:'row',
        gap:15,
        alignItems:'center',
    },

    timeSection:{
        flexDirection:'row',
        alignItems:'center',
        gap:20
    },

    profileSection:{
        alignItems:'center'
    },

    profileImg:{
        width:50,
        height:50,
        borderRadius:50
    },

    infoLine:{
        width:3,
        height:60,
        backgroundColor:'gray',
        opacity:1
    },

    repliesPics:{
        gap:5,
        alignItems:'center'
    },
    replyPic:{
        width:25,
        height:25,
        borderRadius:25
    },
    replyPic1:{
        width:10,
        height:10,
        borderRadius:10
    },
    replyPic2:{
        width:20,
        height:20,
        borderRadius:20
    },
    
    imageContainer:{
        width:'100%',
        height:'auto',
        maxHeight:200,
        justifyContent:'center',
        alignItems:'center'
    },

    image:{
        width:'100%',
        height:'100%'
    }

    
})

export default ThreadItem