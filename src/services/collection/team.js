import request from "../_request";

// 获取我的公开团队
export const GetMyTeamLikes = ({ title, pageNum, pageSize }) =>
  request(
    {
      url: "/team/info/getMymarketTeamLike",
      method: "POST",
      data: {
        title,
        pageNum,
        pageSize,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 获取团队信息
export const GetTeamInfo = ({ teamId }) =>
  request(
    {
      url: "/team/info/getTeamInfo",
      method: "POST",
      data: {
        teamId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 创建团队
export const CreateTeam = ({ iconUri, title, isPublic, description }) =>
  request(
    {
      url: "/team/info/createUserTeam",
      method: "POST",
      data: {
        iconUri,
        title,
        isPublic,
        description,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 退出团队
export const UpdateLogoutTeam = ({ teamId }) =>
  request(
    {
      url: "/team/info/signOutTeam",
      method: "POST",
      data: {
        teamId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 获取我的团队列表
export const GetMyTeams = () =>
  request(
    {
      url: "/team/info/getMyTeamList",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 转让团队
export const UpdateTransferTeam = ({ teamId, userId }) =>
  request(
    {
      url: "/team/info/transferTeam",
      method: "POST",
      data: {
        teamId,
        userId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 转让团队
export const UpdateDissolveTeam = ({ teamId }) =>
  request(
    {
      url: "/team/info/dissolutionTeam",
      method: "POST",
      data: {
        teamId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 修改团队基础信息
export const UpdateTeamBaseInfo = ({
  id,
  iconUri,
  title,
  description,
  isPublic,
  isJoin,
}) =>
  request(
    {
      url: "/team/info/updateUserTeam",
      method: "POST",
      data: {
        id,
        iconUri,
        title,
        description,
        isPublic,
        isJoin,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 修改团队展现信息
export const UpdateTeamView = ({ teamId, viewType }) =>
  request(
    {
      url: "/team/info/updateTeamViewType",
      method: "POST",
      data: {
        teamId,
        viewType,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 获取团队权限列表
export const GetTeamAuths = ({ teamId }) =>
  request(
    {
      url: "/team/info/getTeamUserRoleList",
      method: "POST",
      data: {
        teamId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 修改团队权限
export const UpdateTeamAuth = ({ teamId, roleId, valueId }) =>
  request(
    {
      url: "/team/info/updateTeamUserRoleByid",
      method: "POST",
      data: {
        teamId,
        roleId,
        valueId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 获取团队用户列表
export const GetTeamUsers = ({ teamId, userName, pageNum, pageSize }) =>
  request(
    {
      url: "/team/info/getTeamUser",
      method: "POST",
      data: {
        teamId,
        userName,
        pageNum,
        pageSize,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 获取团队删除记录
export const GetTeamDelHistorys = ({ teamId, pageNum, pageSize }) =>
  request(
    {
      url: "/team/website/getTeamDelWebsite",
      method: "POST",
      data: {
        teamId,
        pageNum,
        pageSize,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 团队角色列表
export const GetTeamRoles = () =>
  request(
    {
      url: "/team/info/getTeamRoleList",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 新增团队成员
export const CreateTeamUser = ({ teamId, account, roleId }) =>
  request(
    {
      url: "/team/info/addTeamUser",
      method: "POST",
      data: {
        teamId,
        account,
        roleId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 删除团队成员
export const DeleteTeamUser = ({ teamId, userId }) =>
  request(
    {
      url: "/team/info/deleteTeamUser",
      method: "POST",
      data: {
        teamId,
        userId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 修改团队成员角色
export const UpdateTeamUserRole = ({ teamId, userId, roleId }) =>
  request(
    {
      url: "/team/info/updateTeamUserRole",
      method: "POST",
      data: {
        teamId,
        userId,
        roleId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 恢复团队删除记录
export const UpdateRecoverTeamDel = ({ teamId, id }) =>
  request(
    {
      url: "/team/website/updateTeamDelRecoveryWebsite",
      method: "POST",
      data: {
        teamId,
        id,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 彻底删除记录
export const DelTeamDelHistory = ({ teamId, id }) =>
  request(
    {
      url: "/team/website/delTeamDelRecycleWebsite",
      method: "POST",
      data: {
        teamId,
        id,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );
