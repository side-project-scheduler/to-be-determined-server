export interface SearchUsersByNicknameInboundPortInputDto {
  userId: number;
  nickname: string;
}

export interface SearchUsersByNicknameInboundPortOutputDto {
  id: number;
  userId: number;
  isFollowing: boolean;
  nickname: string;
  avatarUrl: string;
  bio: string;
}

export interface SearchUsersByEmailInboundPort {
  execute(
    params: SearchUsersByNicknameInboundPortInputDto,
  ): Promise<SearchUsersByNicknameInboundPortOutputDto[]>;
}
