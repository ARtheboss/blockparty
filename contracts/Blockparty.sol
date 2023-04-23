// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Blockparty {
    uint256 public hostCount;
    uint256 public membershipsCount;
    uint256 public announcementCount;

    mapping(uint256 => Membership) memberships;

    mapping(uint256 => Announcement) posts;

    mapping(string => address) hostTags;
    mapping(address => Host) hosts;
    
    struct Membership {
        uint256 id;
        uint256 fee;
        address payable host;
    }

    struct Announcement {
        uint256 id;
        string hash;
    }

    struct Host {
        string tag;
        uint256 fee;
        uint256 members;
        address addr;
    }

    event MembershipCreated (
        uint256 id,
        uint256 fee,
        address payable host
    );

    event HostCreated (
        string tag,
        uint256 fee,
        uint256 members
    );

    function stringsEqual(string memory s1, string memory s2) private pure returns (bool) {
        bytes memory b1 = bytes(s1);
        bytes memory b2 = bytes(s2);
        uint256 l1 = b1.length;
        if (l1 != b2.length) return false;
        for (uint256 i=0; i<l1; i++) {
            if (b1[i] != b2[i]) return false;
        }
        return true;
    }

    function findHost(string memory _tag) external view returns(Host memory _host){
        _host = hosts[hostTags[_tag]];
    }

    function findMe() external view returns(Host memory _me){
        _me = hosts[msg.sender];
    }

    function becomeHost(string memory _tag, uint256 _fee) external {
        require(hostTags[_tag] == address(0), "tag already exists");
        require(hosts[msg.sender].fee == 0, "you already have an account");
        require(_fee > 0);

        hostCount++;

        hosts[msg.sender] = Host(_tag, _fee, 0, msg.sender);
        hostTags[_tag] = msg.sender;

        emit HostCreated(_tag, _fee, 0);
    }

    function changeTag(string memory _tag) external {
        require(hostTags[_tag] == address(0), "tag already exists");
        hostTags[_tag] = msg.sender;
    }

    function changeFee(uint256 _fee) external {
        require(_fee > 0);
        hosts[msg.sender].fee = _fee;
    }

    function joinParty(string memory _tag, uint256 _fee) external {
        Host memory host = hosts[hostTags[_tag]];
        require(stringsEqual(host.tag, _tag), "host does not exist");
        
        require(host.addr != msg.sender, "cannot join your own block party");
        require(_fee >= host.fee, "insufficient amount");
        
        membershipsCount++;
        memberships[membershipsCount] = Membership(membershipsCount, _fee, payable(host.addr));

        host.members++;

        emit MembershipCreated(membershipsCount, _fee, payable(host.addr));
    }



}
