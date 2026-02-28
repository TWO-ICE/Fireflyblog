import type { FriendLink, FriendsPageConfig } from "../types/config";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	// 友链已清空 - 如需添加，请按照下方格式添加
	// {
	// 	title: "友链标题",
	// 	imgurl: "头像URL",
	// 	desc: "友链描述",
	// 	siteurl: "网站URL",
	// 	tags: ["标签"],
	// 	weight: 10,
	// 	enabled: true,
	// },
];

// 获取启用的友链并按权重排序
export const getEnabledFriends = (): FriendLink[] => {
	return friendsConfig
		.filter((friend) => friend.enabled)
		.sort((a, b) => b.weight - a.weight);
};
