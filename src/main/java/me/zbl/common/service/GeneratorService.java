/**
 *
 */
package me.zbl.common.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author ZhangJun
 * @Time 2017年9月6日
 * @description
 */
@Service
public interface GeneratorService {

  List<Map<String, Object>> list();

  byte[] generatorCode(String[] tableNames);
}
