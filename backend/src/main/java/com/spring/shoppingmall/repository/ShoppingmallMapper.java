package com.spring.shoppingmall.repository;

import org.apache.ibatis.annotations.Mapper;
import com.spring.shoppingmall.vo.*;
import java.util.List;

@Mapper
public interface ShoppingmallMapper {
    List<ProductGroupInfoVO> getListExhibition();
}
