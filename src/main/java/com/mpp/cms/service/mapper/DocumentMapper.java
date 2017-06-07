package com.mpp.cms.service.mapper;

import com.mpp.cms.domain.*;
import com.mpp.cms.service.dto.DocumentDTO;

import com.mpp.cms.service.dto.UserDTO;
import org.mapstruct.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Mapper for the entity Document and its DTO DocumentDTO.
 */
@Service
public class DocumentMapper {
    public DocumentDTO toDto(Document document) {
        return new DocumentDTO(document);
    }

    public List<DocumentDTO> toDto(List<Document> documents) {
        return documents.stream()
            .filter(Objects::nonNull)
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public Document toEntity(DocumentDTO documentDTO) {
        if (documentDTO == null) {
            return null;
        } else {
            Document document = new Document();
            document.setId(documentDTO.getId());
            document.setUrl(documentDTO.getUrl());
            document.setName(documentDTO.getName());
            return document;
        }
    }

    public List<Document> toEntities(List<DocumentDTO> documentDTOs) {
        return documentDTOs.stream()
            .filter(Objects::nonNull)
            .map(this::toEntity)
            .collect(Collectors.toList());
    }

    public Document fromId(Long id) {
        if (id == null) {
            return null;
        }
        Document document = new Document();
        document.setId(id);
        return document;
    }
}
