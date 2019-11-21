const login_api = '/login'
const importUser_api = '/importFile'    //导入学生信息文件
const getStudent_api = '/getStudent'    // 查询学生信息

const getAnnouncement_api = '/getAnnouncement'      // 获取公告列表
const addAnnouncement_api = '/addAnnouncement'      // 添加公告
const sendEmail_api = '/sendEmail'                 // 发送邮件接口
const addActivityPhoto_api = '/addActivityPhoto'        // 添加活动图片
const queryActivityPhoto_api = '/queryActivityPhoto'        // 查询活动图片列表
export default {
    login_api,  // 登陆接口
    importUser_api,     // 导入用户信息表格
    getStudent_api,     // 查询学生信息
    getAnnouncement_api,    // 获取公告列表接口
    addAnnouncement_api,    // 添加公告
    sendEmail_api,          // 发送邮件接口
    addActivityPhoto_api,       // 添加活动图片
    queryActivityPhoto_api,     // 查询活动图片列表
}