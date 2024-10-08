package me.zbl.system.service;

import me.zbl.common.domain.Tree;
import me.zbl.system.domain.DeptDO;

import java.util.List;
import java.util.Map;

/**
 * 部门管理
 *
 * @author ZhangJun
 * @email 18333298410@163.com
 * @date 2017-09-27 14:28:36
 */
public interface DeptService {

  DeptDO get(Long deptId);

  List<DeptDO> list(Map<String, Object> map);

  int count(Map<String, Object> map);

  int save(DeptDO sysDept);

  int update(DeptDO sysDept);

  int remove(Long deptId);

  int batchRemove(Long[] deptIds);

  Tree<DeptDO> getTree();

  boolean checkDeptHasUser(Long deptId);
}
